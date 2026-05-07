'use server'

import { createClient } from '@/utils/supabase/server'

export async function signupAction(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!name || name.trim().length < 2) {
    return { error: 'Le nom doit faire au moins 2 caractères' }
  }
  
  if (!email || !email.includes('@')) {
    return { error: 'Email invalide' }
  }
  
  if (!password || password.length < 8) {
    return { error: 'Le mot de passe doit faire au moins 8 caractères' }
  }
  
  if (password !== confirmPassword) {
    return { error: 'Les mots de passe ne correspondent pas' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { 
        name: name.trim() 
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/espace-etudiant`
    }
  })

  if (error) {
    console.error('Erreur Supabase:', error)
    
    if (error.message.includes('already registered')) {
      return { error: 'Cet email est déjà utilisé' }
    }
    
    return { error: 'Erreur lors de l\'inscription' }
  }

  return { success: true }
}