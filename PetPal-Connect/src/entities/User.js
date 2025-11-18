import { supabase } from "@/lib/supabase";

export const User = {
  me: async () => {
    try {
      // Tenta pegar usuario real
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        return {
          id: data.user.id,
          full_name: data.user.user_metadata?.full_name || "Tutor PetPal",
          email: data.user.email,
          foto_url: data.user.user_metadata?.avatar_url
        };
      }
    } catch (e) {
      console.warn("Modo offline ou erro Supabase");
    }
    // Retorna usuário fictício para a tela abrir
    return {
      id: "guest",
      full_name: "Tutor Visitante",
      email: "teste@petpal.com",
      foto_url: null
    };
  },
  logout: async () => {
    await supabase.auth.signOut();
    window.location.reload();
  }
};