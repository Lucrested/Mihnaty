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
      .filter("ProviderID", "eq", ProviderID)
      .filter("is_available", "eq", true);

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

    const { data, error } = await supabase
      .from("UserSchedule")
      .select(
        `
        ScheduleID,
        UserID,
        TimeSlot: TimeSlot (TimeSlotID, ProviderID, Date, StartTime, EndTime)
      
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

    const { data: updateTimeSlotAvailability, updateError } = await supabase
      .from("TimeSlot")
      .update({ is_available: false })
      .eq("TimeSlotID", TimeSlotID);

    if (updateError) throw updateError;

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

app.delete(
  "/api/userschedule/remove-timeslot/:scheduleID/:timeSlotID",
  async (req, res) => {
    try {
      const scheduleID = req.params.scheduleID;
      const timeSlotID = req.params.timeSlotID;
      console.log("ScheduleID in server: ", scheduleID);

      // Update availability to true before deleting
      const updateResponse = await supabase
        .from("TimeSlot")
        .update({ is_available: true })
        .match({ TimeSlotID: timeSlotID });

      if (updateResponse.error) throw updateResponse.error;

      // Delete the entry
      const deleteResponse = await supabase
        .from("UserSchedule")
        .delete()
        .eq("ScheduleID", scheduleID);
      // if (deleteResponse.error) {
      //   console.error("Error removing time slot from user schedule:", error);
      //   throw deleteResponse.error;
      // }

      if (
        Array.isArray(deleteResponse.data) &&
        deleteResponse.data.length > 0
      ) {
        res.json({
          Message: "This time slot has been removed from the schedule",
        });
      } else {
        res.status(404).json({ message: "Schedule entry not found" });
      }

      // if (deleteResponse.data) {
      //   res.json({
      //     Message: "This time slot has been removed from the schedule",
      //   });
      // } else {
      //   res.status(404).json({ message: "Schedule entry not found" });
      // }

      // // if (deleteResponse.data.length > 0) {
      // //   res.json({
      // //     Message: "This time slot has been removed from the schedule",
      // //   });
      // // } else {
      // //   res.status(404).json({ message: "Schedule entry not found" });
      // // }
    } catch (error) {
      console.error(
        "Error removing time slot from user schedule:",
        error.message
      );
      res.status(500).json({ message: "Internal server error." });
    }
  }
);
