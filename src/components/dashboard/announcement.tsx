import { useState } from "react"
import { useForm } from "react-hook-form"
import { Megaphone, Calendar, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

interface AnnouncementData {
  title: string
  message: string
}

interface Announcement extends AnnouncementData {
  id: string
  createdAt: string
  author: string
}

const AnnouncementPage =()=> {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Welcome to Our New Platform",
      message:
        "We're excited to announce the launch of our new company platform. This will serve as the central hub for all company communications and updates.",
      createdAt: "2024-01-15",
      author: "Admin",
    },
  ])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementData>()

  const onSubmit = async (data: AnnouncementData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newAnnouncement: Announcement = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      author: "Admin",
    }

    setAnnouncements((prev) => [newAnnouncement, ...prev])
    reset()
  }

  return (
    <div className=" text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Megaphone className="h-8 w-8 text-white" />
            <h1 className="text-4xl font-bold">Company Announcements</h1>
          </div>
          <p className="text-gray-400 text-lg">Stay updated with the latest company news and updates</p>
        </div>

        {/* Admin Form */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Admin Panel
            </CardTitle>
            <CardDescription className="text-gray-400">Create a new company announcement</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Announcement Title
                </Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title must be less than 100 characters",
                    },
                  })}
                  placeholder="Enter announcement title..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Message must be less than 1000 characters",
                    },
                  })}
                  placeholder="Enter your announcement message..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                />
                {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-black hover:bg-gray-200">
                {isSubmitting ? "Publishing..." : "Publish Announcement"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-white">Recent Announcements</h2>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              {announcements.length} {announcements.length === 1 ? "announcement" : "announcements"}
            </Badge>
          </div>

          {announcements.length === 0 ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="py-12 text-center">
                <Megaphone className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No announcements yet</p>
                <p className="text-gray-500 text-sm">Create your first announcement above</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={announcement.id} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-white text-xl">{announcement.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {announcement.author}
                          </div>
                        </div>
                      </div>
                      {index === 0 && <Badge className="bg-blue-600 hover:bg-blue-700">Latest</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{announcement.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementPage;
