let currentUser = null;

async function signUp(email, password) {
  try {
    const { data, error } = await window.supabaseClient.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Sign up error:', error);
      throw error;
    }
    return data;
  } catch (err) {
    console.error('Sign up exception:', err);
    throw err;
  }
}

async function signIn(email, password) {
  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }
    currentUser = data.user;
    return data;
  } catch (err) {
    console.error('Sign in exception:', err);
    throw err;
  }
}

async function signOut() {
  const { error } = await window.supabaseClient.auth.signOut();
  if (error) throw error;
  currentUser = null;
}

async function getCurrentUser() {
  try {
    const { data, error } = await window.supabaseClient.auth.getUser();
    if (error) {
      console.log('No user session:', error.message);
      return null;
    }
    currentUser = data.user;
    return data.user;
  } catch (err) {
    console.log('Error getting user:', err.message);
    return null;
  }
}

async function initAuth() {
  // Primero, escuchar cambios de autenticación
  window.supabaseClient.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user || null;
    if (currentUser) {
      renderApp();
    } else {
      renderAuthScreen();
    }
  });

  // Luego, intentar obtener el usuario actual
  const user = await getCurrentUser();
  if (user) {
    renderApp();
  } else {
    renderAuthScreen();
  }
}
