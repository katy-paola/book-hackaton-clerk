import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import CategoriesList from './components/CategoriesList'
import Loading from './loading'

export default async function CategoriesPage() {
  // Verificar si el usuario está autenticado
  const { userId } = await auth()
  if (!userId) {
    redirect('/books')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Administrar Categorías</h1>
        <Link href="/books" className="back-button">
          ← Volver al catálogo
        </Link>
      </div>
      
      <Suspense fallback={<Loading />}>
        <CategoriesList />
      </Suspense>
    </div>
  )
} 