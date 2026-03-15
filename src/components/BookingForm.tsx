"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DateReserve from "@/components/DateReserve";

export default function BookingForm() {
  const [venue, setVenue] = useState("");

  return (
    <form className="flex flex-col gap-6">
      <TextField
        name="Name-Lastname"
        label="Name-Lastname"
        variant="standard"
      />
      <TextField
        name="Contact-Number"
        label="Contact-Number"
        variant="standard"
      />
      <FormControl variant="standard">
        <InputLabel id="venue-label">Venue</InputLabel>
        <Select
          labelId="venue-label"
          id="venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
      </FormControl>
      <DateReserve />
      <Button type="submit" variant="contained" name="Book Venue">
        Book Venue
      </Button>
    </form>
  );
}
