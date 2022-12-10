import { FC, ReactElement } from "react";
import { ForecastData } from "../../interfaces";

import styles from "./GlassCard.module.sass";

type GlassCardProps = {
  selectedCity: {
    name: string;
    selected: boolean;
    data: ForecastData | undefined;
  };
};

const GlassCard: FC<GlassCardProps> = ({ selectedCity }): ReactElement => {
  const { name, data } = selectedCity;

  /**
   * Forecast details
   */
  const temperature =
    data?.properties.timeseries[0].data.instant.details.air_temperature;
  const airPressure =
    data?.properties.timeseries[0].data.instant.details
      .air_pressure_at_sea_level;
  const humidity =
    data?.properties.timeseries[0].data.instant.details.relative_humidity;
  const windSpeed =
    data?.properties.timeseries[0].data.instant.details.wind_speed;

  /**
   * Forecast Units
   */
  const tempreratureUnit = <span>&#8451;</span>;
  const airPressureUnit = data?.properties.meta.units.air_pressure_at_sea_level;
  const humidityUnit = data?.properties.meta.units.relative_humidity;
  const windSpeedUnit = data?.properties.meta.units.wind_speed;

  /**
   * Data to visualize
   */
  const cardDetails = [
    {
      name: "Temperature",
      data: temperature,
      units: tempreratureUnit,
    },
    {
      name: "Air Pressure",
      data: airPressure,
      units: airPressureUnit,
    },
    {
      name: "Humidity",
      data: humidity,
      units: humidityUnit,
    },
    {
      name: "Wind Speed",
      data: windSpeed,
      units: windSpeedUnit,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        {/* Fill */}
        <div />
        {/* Glow */}
        <div />
      </div>

      <div className={styles.mainBox}>
        <p>{name}</p>

        {cardDetails.map(({ name, data, units }, index) => (
          <div className={styles.detailsBox} key={index}>
            <p>{name}:</p>
            <p>
              {data}
              {units}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlassCard;
