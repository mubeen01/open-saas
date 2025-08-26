import { useState } from 'react'

type Task = {
  id: string
  description: string
  isDone: boolean
  time: string
}

type AIResponse = {
  id: string
  content: string
  createdAt: string
}

export default function DemoAppPage() {
  const [prompt, setPrompt] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [responses, setResponses] = useState<AIResponse[]>([])

  const handleGenerateResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    // Mock response for now - replace with API call later
    const mockResponse: AIResponse = {
      id: Date.now().toString(),
      content: `Mock AI response to: "${prompt}"`,
      createdAt: new Date().toISOString(),
    }

    setResponses((prev) => [mockResponse, ...prev])
    setPrompt('')
  }

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskDescription.trim()) return

    // Mock task creation - replace with API call later
    const mockTask: Task = {
      id: Date.now().toString(),
      description: taskDescription,
      isDone: false,
      time: '1',
    }

    setTasks((prev) => [...prev, mockTask])
    setTaskDescription('')
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Demo App
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Explore AI capabilities and manage your tasks
          </p>
          <div className="mt-4">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* AI Chat Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Assistant
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate responses using AI. Each request uses 1 credit.
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleGenerateResponse} className="space-y-4">
                  <div>
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your prompt
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ask me anything..."
                      rows={4}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Response
                  </button>
                </form>
              </div>
            </div>

            {/* AI Responses */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent AI Responses
                </h3>
              </div>
              <div className="p-6">
                {responses.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {responses.map((response) => (
                      <div
                        key={response.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <p className="text-sm whitespace-pre-wrap text-gray-900 dark:text-white">
                          {response.content}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {new Date(response.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No AI responses yet. Try generating one!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Task Management Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <span className="mr-2">✅</span>
                  Task Manager
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <div>
                    <label
                      htmlFor="task"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      New task
                    </label>
                    <input
                      id="task"
                      type="text"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      placeholder="Enter task description"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!taskDescription.trim()}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Your Tasks
                </h3>
              </div>
              <div className="p-6">
                {tasks.length > 0 ? (
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={() => handleToggleTask(task.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span
                            className={`text-gray-900 dark:text-white ${
                              task.isDone
                                ? 'line-through text-gray-500 dark:text-gray-400'
                                : ''
                            }`}
                          >
                            {task.description}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                            {task.time}h
                          </span>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No tasks yet. Create your first task!
                  </p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Quick Stats
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {tasks.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Tasks
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {tasks.filter((t) => t.isDone).length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {responses.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      AI Responses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Credits Left
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
            🔧 Development Note
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            This is a working demo page with mock functionality. To make it
            production-ready:
          </p>
          <ul className="text-sm text-blue-700 dark:text-blue-200 mt-2 list-disc list-inside">
            <li>Replace mock functions with actual API calls</li>
            <li>Connect to your backend services</li>
            <li>Add authentication and user management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
