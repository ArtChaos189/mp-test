import { useState } from "react";

import "./test-locations-list.scss";
import { TestLocation } from "../../test-location";

type TestLocationsListProps = {
  id: number;
  locationID: number | undefined;
  envID: number | undefined;
  hint: string;
};

export const TestLocationsList = () => {
  const [locations, setLocations] = useState<TestLocationsListProps[]>([]);

  const addLocation = () => {
    setLocations((prevLocations) => [
      ...prevLocations,
      { id: prevLocations.length, locationID: undefined, envID: undefined, hint: "" },
    ]);
  };

  const removeLocation = (id: number) => {
    setLocations((prevLocations) => prevLocations.filter((location) => location.id !== id));
  };

  const handleLocationData = (id: number, newEntry: Omit<TestLocationsListProps, "id">) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) => (location.id === id ? { ...location, ...newEntry } : location))
    );
  };

  const logLocationsData = () => {
    const formattedData = locations.map(({ locationID, envID, hint }) => ({
      locationID,
      envID,
      hint,
    }));
    console.log(formattedData);
  };

  return (
    <div className="container">
      {locations.map(({ id }) => (
        <TestLocation
          key={id}
          index={id}
          onRemove={() => removeLocation(id)}
          onSaveLocation={(data) => handleLocationData(id, data)}
        />
      ))}
      <div className="button-wrapper">
        <button onClick={addLocation}>Добавить тестовую локацию</button>
        <button onClick={logLocationsData}>Вывести результат в консоль</button>
      </div>
    </div>
  );
};
