import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Select } from "../../select/ui/select";

import { storeContext } from "../../../store";

import "./test-location.scss";

type LocationData = {
  locationID: number | undefined;
  envID: number | undefined;
  hint: string;
};

type TestLocationProps = {
  index: number;
  onRemove: () => void;
  onSaveLocation: (data: LocationData) => void;
};

export const TestLocation = observer(({ index, onRemove, onSaveLocation }: TestLocationProps) => {
  const store = useContext(storeContext);
  const [selectedLocationID, setSelectedLocationID] = useState<number | undefined>(undefined);
  const [selectedEnvID, setSelectedEnvID] = useState<number | undefined>(undefined);
  const [hint, setHint] = useState("");

  useEffect(() => {
    if (!store.isLoaded) {
      store.fetchData();
    }
  }, [store]);

  if (!store.isLoaded) {
    return <div>Данные не загружены</div>;
  }

  const filteredEnvs = store.envs.filter((env) =>
    store.servers.some((server) => server.envID === env.envID && server.locationID === selectedLocationID)
  );

  const availableServers = store.servers.filter(
    (server) => server.locationID === selectedLocationID && server.envID === selectedEnvID
  );

  const handleAddLocation = () => {
    const newEntry = {
      locationID: selectedLocationID,
      envID: selectedEnvID,
      hint: hint,
    };
    onSaveLocation(newEntry);
  };

  const selectedLocationName =
    store.locations.find((location) => location.locationID === selectedLocationID)?.name || "Новая локация";

  return (
    <div className="form">
      <h2>Тестовая локация: {selectedLocationName}</h2>
      <div className="wrapper">
        <Select
          options={store.locations.map((location) => ({
            value: location.locationID,
            label: location.name,
          }))}
          id={`location-select-${index}`}
          value={selectedLocationID}
          onChange={setSelectedLocationID}
          label="Локация"
          placeholder="Выберите локацию"
        />

        <Select
          options={filteredEnvs.map((env) => ({
            value: env.envID,
            label: env.name,
          }))}
          id={`env-select-${index}`}
          value={selectedEnvID}
          onChange={setSelectedEnvID}
          label="Среда"
          placeholder="Выберите среду"
        />

        <div className="servers">
          <p className="name">Cерверы:</p>
          {availableServers.length > 0 && (
            <p className="servers-name">{availableServers.map(({ name }) => name).join(", ")}</p>
          )}
        </div>

        <button className="remove-button" onClick={onRemove}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>

      <div className="input_wrapper">
        <label htmlFor={`clue-input-${index}`}>Подсказка</label>
        <input
          id={`clue-input-${index}`}
          type="text"
          placeholder="Комментарий по локации"
          value={hint}
          onChange={(event) => setHint(event.target.value)}
        />
      </div>

      <button className="save-button" onClick={handleAddLocation}>
        Сохранить локацию
      </button>
    </div>
  );
});
