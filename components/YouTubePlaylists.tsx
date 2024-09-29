import { Card, CardContent } from "@/components/ui/card"

export default function YouTubePlaylists() {
    const playlists = [
        { id: 1, title: "Web Development Basics", videoCount: 10 },
        { id: 2, title: "Advanced React Patterns", videoCount: 8 },
        { id: 3, title: "Node.js for Beginners", videoCount: 12 },
        { id: 4, title: "Full Stack Development", videoCount: 15 }
    ]

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">YouTube Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {playlists.map(playlist => (
                    <Card key={playlist.id}>
                        <CardContent className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{playlist.title}</h3>
                            <p className="text-gray-600">{playlist.videoCount} videos</p>
                            <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Watch Playlist</a>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
