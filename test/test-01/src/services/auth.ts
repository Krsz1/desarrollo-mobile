export type Rol = "recepcionista" | "medico";

export interface User {
  id: number;
  email: string;
  password?: string;
  role: Rol;
  nombre: string;
  apellido: string;
  avatar?: string | null;
}

const USER_KEY = "medicare_user";
const AVATAR_KEY = "medicare_avatars";

const USERS: User[] = [
  {
    id: 1,
    email: "admin@medicare.com",
    password: "admin123",
    role: "recepcionista",
    nombre: "Ana",
    apellido: "Pérez",
    avatar: null,
  },
  {
    id: 2,
    email: "doc@medicare.com",
    password: "doc123",
    role: "medico",
    nombre: "Juan",
    apellido: "Gómez",
    avatar: null,
  },
];

export function login(email: string, password: string): User | null {
  const user = USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;

  // Restore avatar from separate storage if exists
  try {
    const avatarMap = localStorage.getItem(AVATAR_KEY);
    if (avatarMap) {
      const map = JSON.parse(avatarMap) as Record<string, string>;
      if (map[userWithoutPassword.email]) {
        userWithoutPassword.avatar = map[userWithoutPassword.email];
      }
    }
  } catch {
    // ignore parse errors
  }

  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

  return userWithoutPassword as User;
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // Save avatar in separate key to persist across logouts
  try {
    let avatarMap = {} as Record<string, string>;
    const existing = localStorage.getItem(AVATAR_KEY);
    if (existing) {
      avatarMap = JSON.parse(existing);
    }
    if (user.avatar) {
      avatarMap[user.email] = user.avatar;
    } else {
      delete avatarMap[user.email];
    }
    localStorage.setItem(AVATAR_KEY, JSON.stringify(avatarMap));
  } catch {
    // ignore storage errors
  }
}