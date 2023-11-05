import express from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://avqehneljdhiwqfvpmqa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2cWVobmVsamRoaXdxZnZwbXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyMTczMjcsImV4cCI6MjAxNDc5MzMyN30.KQ8g2FY1IbYkwRc8_BJoWPasQXrISXOuPNrUMeXa-9w";

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const checkConnection = async () => {
  try {
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
        body: data,
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
  console.log(`Server is running on port ${port}`);
});

app.get("/test-supabase-connection", async (req, res) => {
  const connectionTestResult = await checkConnection();
  res.json(connectionTestResult);
});
