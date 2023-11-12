import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { EventGrid } from "../../components"; 

const FilteredSearch = () => {
    const { state } = useLocation();
    const events = state ? state.events : [];

    return (
      <EventGrid events={events} />
    );
  };
  
  
export default FilteredSearch;
