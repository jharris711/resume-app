// Import necessary functions and types from Jotai
import { atom, useAtom } from 'jotai';
import { Database } from '@/lib/types/supabase';

// Define the Resume type from the database schema
type Resume = Database['public']['Tables']['resumes']['Row'];

// Define the Config type with a selected property
type Config = {
  selected: Resume['id'] | null;
};

// Initialize a configAtom with a null default value for selected
const initialConfigAtom = atom<Config>({ selected: null });

// Create a setter atom for updating the selected ID
const configAtom = atom(
  (get) => get(initialConfigAtom),
  (_, set, update: Resume['id'] | null) =>
    set(initialConfigAtom, { selected: update })
);

// Custom hook to use the configAtom
export function useResume() {
  const [config, setConfig] = useAtom(configAtom);

  // Function to update the selected resume ID
  const selectResume = (id: Resume['id'] | null) => {
    setConfig(id);
  };

  return { ...config, selectResume };
}
