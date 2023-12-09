import express from "express";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

const supabaseUrl = "https://avqehneljdhiwqfvpmqa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2cWVobmVsamRoaXdxZnZwbXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTczMjcsImV4cCI6MjAxNDc5MzMyN30.KQ8g2FY1IbYkwRc8_BJoWPasQXrISXOuPNrUMeXa-9w";

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const testSupabaseConnection = async () => {
  try {
    // Make a simple query to check the connection
    const { data, error } = await supabase.from("test").select("*");
    if (error) {
      return {
        success: false,
        message: "Supabase connection error",
        error: error.message,
      };
    } else {
      return {
        success: true,
        message: "Supabase connection is established",
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error testing Supabase connection",
      error: err.message,
    };
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get("/test-supabase-connection", async (req, res) => {
  const connectionTestResult = await testSupabaseConnection();
  res.json(connectionTestResult);
});

app.get("/api/categories", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Category").select("*");
    res.json(data);
    console.log("Data gotten");
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/providers", async (req, res) => {
  try {
    const { data, error } = await supabase.from("providers-test").select("*");
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/timeslots/:ProviderID", async (req, res) => {
  try {
    const ProviderID = req.params.ProviderID;
    const { data, error } = await supabase
      .from("TimeSlot")
      .select("*")
      .filter("ProviderID", "eq", ProviderID);

    console.log("Time Slot Data gotten: ", data);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.json(error);
  }
});
