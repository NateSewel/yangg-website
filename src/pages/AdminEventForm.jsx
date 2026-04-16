import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiSave } from 'react-icons/hi'
import { createEvent, getEventById, updateEvent, uploadEventImage } from '../services/eventsService'

const AdminEventForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    theme: '',
    short_description: '',
    overview: '',
    date: '',
    location: '',
    category: 'conference',
    status: 'upcoming',
    image: '',
    objectives: [],
    speakers: [],
    highlights: [],
    impact: '',
    participants: ''
  })

  const [objectiveInput, setObjectiveInput] = useState('')
  const [speakerInput, setSpeakerInput] = useState({ name: '', title: '', country: '' })
  const [highlightInput, setHighlightInput] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchEvent()
    }
  }, [id])

  const fetchEvent = async () => {
    setLoading(true)
    const { data, error } = await getEventById(id)
    if (!error && data) {
      setFormData({
        ...data,
        objectives: data.objectives || [],
        speakers: data.speakers || [],
        highlights: data.highlights || []
      })
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const eventId = formData.id || `event-${Date.now()}`
    const { data, error } = await uploadEventImage(file, eventId)
    
    if (!error && data) {
      setFormData(prev => ({ ...prev, image: data.url, id: eventId }))
    } else {
      console.error('Failed to upload image:', error)
    }
    setUploading(false)
  }

  const addObjective = () => {
    if (objectiveInput.trim()) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, objectiveInput.trim()]
      }))
      setObjectiveInput('')
    }
  }

  const removeObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }))
  }

  const addSpeaker = () => {
    if (speakerInput.name.trim()) {
      setFormData(prev => ({
        ...prev,
        speakers: [...prev.speakers, speakerInput]
      }))
      setSpeakerInput({ name: '', title: '', country: '' })
    }
  }

  const removeSpeaker = (index) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index)
    }))
  }

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()]
      }))
      setHighlightInput('')
    }
  }

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Generate ID if creating new event
    const eventData = {
      ...formData,
      id: formData.id || `${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`
    }

    const { error } = isEdit 
      ? await updateEvent(id, eventData)
      : await createEvent(eventData)

    if (!error) {
      navigate('/admin/events')
    } else {
      console.error(`Failed to ${isEdit ? 'update' : 'create'} event:`, error)
    }
    setLoading(false)
  }

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32a8ed]"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/events')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#32a8ed] dark:hover:text-[#32a8ed] mb-4"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back to Events
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isEdit ? 'Edit Event' : 'Create New Event'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in the details below to {isEdit ? 'update' : 'create'} an event
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <input
                type="text"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date *
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                placeholder="e.g., October 5, 2024"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              >
                <option value="conference">Conference</option>
                <option value="training">Training</option>
                <option value="workshop">Workshop</option>
                <option value="campaign">Campaign</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Overview
              </label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-4 h-32 rounded-lg object-cover" />
              )}
            </div>
          </div>
        </div>

        {/* Objectives */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Objectives
          </h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
              placeholder="Add an objective..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
            />
            <button
              type="button"
              onClick={addObjective}
              className="px-4 py-2 bg-[#32a8ed] text-white rounded-lg hover:bg-[#2a8bc4] transition-colors"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.objectives.map((obj, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="flex-1 text-gray-900 dark:text-white">{obj}</span>
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Speakers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Speakers/Facilitators
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <input
              type="text"
              value={speakerInput.name}
              onChange={(e) => setSpeakerInput(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Name"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
            />
            <input
              type="text"
              value={speakerInput.title}
              onChange={(e) => setSpeakerInput(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={speakerInput.country}
                onChange={(e) => setSpeakerInput(prev => ({ ...prev, country: e.target.value }))}
                placeholder="Country"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
              <button
                type="button"
                onClick={addSpeaker}
                className="px-4 py-2 bg-[#32a8ed] text-white rounded-lg hover:bg-[#2a8bc4] transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {formData.speakers.map((speaker, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{speaker.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {speaker.title} {speaker.country && `• ${speaker.country}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeSpeaker(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Highlights
          </h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
              placeholder="Add a highlight..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
            />
            <button
              type="button"
              onClick={addHighlight}
              className="px-4 py-2 bg-[#32a8ed] text-white rounded-lg hover:bg-[#2a8bc4] transition-colors"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="flex-1 text-gray-900 dark:text-white">{highlight}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Additional Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Impact
              </label>
              <textarea
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Participants
              </label>
              <input
                type="text"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
                placeholder="e.g., 500+ attendees"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#32a8ed] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#32a8ed] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2a8bc4] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <HiSave className="w-5 h-5" />
            {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminEventForm
