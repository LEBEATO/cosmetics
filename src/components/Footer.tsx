import { Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 mt-8 border-t border-fuchsia-500/20">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 mx-auto sm:flex-row sm:justify-between">
        <span className="text-sm text-zinc-400">Fortenati</span>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="transition-colors text-zinc-400 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="#"
              className="transition-colors text-zinc-400 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              className="transition-colors text-zinc-400 hover:text-white"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </Link>
          </div>
          <span className="text-sm text-zinc-500">
            © {new Date().getFullYear()} - Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
