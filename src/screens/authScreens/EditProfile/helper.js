import COLLECTIONS from "../../../Backend/collecctions";
import { saveData } from "../../../Backend/utility";

const DEFAULT_PREFERENCES = {
  interested: ["Male", "Female", "Trans", "Non-Binary"],
  distance: 500,
  ageFrom: 18,
  ageTo: 90,
};

export const saveDefaultPreferences = async (id) => {
  await saveData(COLLECTIONS.PREFERENCE, id, DEFAULT_PREFERENCES);
};
