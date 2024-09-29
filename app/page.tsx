import Link from 'next/link'
import { Button } from "@/components/ui/button"
import YouTubePlaylists from '@/components/YouTubePlaylists'
import BlogHighlights from '@/components/BlogHighlights'
import HomePage from "@/components/HomePage";

export default function Dashboard() {
  return (
      <div className="container mx-auto px-6">
        <HomePage />
        {/*<section className="mb-12">*/}
        {/*  <h2 className="text-3xl font-bold mb-4">Quick Links</h2>*/}
        {/*  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">*/}
        {/*    <Link href="/resume" passHref>*/}
        {/*      <Button className="w-full h-20 text-lg">My Resume</Button>*/}
        {/*    </Link>*/}
        {/*    <Link href="/contact" passHref>*/}
        {/*      <Button className="w-full h-20 text-lg">Contact Me</Button>*/}
        {/*    </Link>*/}
        {/*    <Link href="/blog" passHref>*/}
        {/*      <Button className="w-full h-20 text-lg">All Blog Posts</Button>*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</section>*/}
        {/*<YouTubePlaylists />*/}
        {/*<BlogHighlights />*/}
      </div>
  )
}
