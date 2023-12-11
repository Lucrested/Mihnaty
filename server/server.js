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

app.get("/api/userschedule/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    // const { data, error } = await supabase
    //   .from("UserSchedule")
    //   .select(
    //     `
    //     UserSchedule.ScheduleID,
    //     UserSchedule.UserID,
    //     UserSchedule.TimeSlotID,
    //     TimeSlot.Date,
    //     TimeSlot.StartTime,
    //     TimeSlot.EndTime
    //   `
    //   )
    //   .eq("UserSchedule.UserID", userID)
    //   .join({
    //     table: "TimeSlot",
    //     on: ["UserSchedule.TimeSlotID", "TimeSlot.TimeSlotID"],
    //   });

    // if (error) throw error;
    // console.log(data);

    // res.json(data);

    const { data, error } = await supabase
      .from("UserSchedule")
      .select(
        `
        ScheduleID,
        UserID,
        TimeSlot (Date, StartTime, EndTime)
      `
      )
      .eq("UserID", userID);

    if (error) throw error;
    console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/api/userschedule/add-timeslot", async (req, res) => {
  try {
    const { UserID, TimeSlotID, BookingDate } = req.body;
    // const { TimeSlotID, BookingDate } = req.body;
    const { data, error } = await supabase.from("UserSchedule").upsert([
      {
        UserID: UserID,
        TimeSlotID: TimeSlotID,
      },
    ]);

    if (error) throw error;

    res.json({
      message: "Time slot added to user Schedule",
      // ScheduleID: data[0].ScheduleID,
    });
  } catch (error) {
    console.error(error.message);
  }
});
