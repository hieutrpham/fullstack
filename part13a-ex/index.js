import { createClient } from "@supabase/supabase-js";
import "@dotenvx/dotenvx/config";

const supabase = createClient(process.env.API_URL, process.env.API_KEY);

const { data, error } = await supabase.from("blogs").select();

console.log(typeof data);
console.log(Object.values(data));

console.log(data.map((d) => d.author));
