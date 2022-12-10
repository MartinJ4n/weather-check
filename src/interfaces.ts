export interface City {
  name: string;
  selected: boolean;
  data: ForecastData | undefined;
}

export interface ForecastData {
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    meta: {
      updated_at: Date;
      units: Units;
    };
    timeseries: TimeSeries[];
  };
  type: string;
}

interface Units {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  cloud_area_fraction: string;
  precipitation_amount: string;
  relative_humidity: string;
  wind_from_direction: string;
  wind_speed: string;
}

interface TimeSeries {
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number;
        air_temperature: number;
        cloud_area_fraction: number;
        relative_humidity: number;
        wind_from_direction: number;
        wind_speed: number;
      };
    };
    next_1_hours: {
      details: {
        precipitation_amount: number;
      };
      summary: {
        symbol_code: string;
      };
    };
    next_6_hours: {
      details: {
        precipitation_amount: number;
      };
      summary: {
        symbol_code: string;
      };
    };
    next_12_hours: {
      summary: {
        symbol_code: string;
      };
    };
  };
  time: Date;
}
