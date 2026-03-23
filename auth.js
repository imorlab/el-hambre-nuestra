let currentUser = null;

async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  currentUser = data.user;
  return data;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  currentUser = null;
}

async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  currentUser = data.user;
  return data.user;
}

async function initAuth() {
  const user = await getCurrentUser();
  if (user) {
    currentUser = user;
    renderApp();
  } else {
    renderAuthScreen();
  }

  supabase.auth.onAuthStateChange((event, session) => {
    currentUser = session?.user || null;
    if (currentUser) {
      renderApp();
    } else {
      renderAuthScreen();
    }
  });
}
