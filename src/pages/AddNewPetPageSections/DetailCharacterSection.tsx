import IconButton from '@/components/common/IconButton'
import InfoRow from '@/components/common/InfoRow'
import {
  DAY_WEATHER,
  NIGHT_WEATHER,
  PERSONALITY,
  PREFERRED_PATHS,
  UI_TEXT,
  UNIT_OF_MEASURE,
} from '@/constants/constants'

import type { Dispatch, SetStateAction } from 'react'
import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import { FaCloudSun } from 'react-icons/fa6'
import { CiCloudMoon } from 'react-icons/ci'
import { IoRainyOutline } from 'react-icons/io5'
import { RiSnowyLine } from 'react-icons/ri'
import { TiWeatherWindy } from 'react-icons/ti'
import GrassRoad from '@/assets/GrassRoad.png'
import DirtRoad from '@/assets/DirtRoad.png'
import Road from '@/assets/Road.svg'

interface DetailCharacterSectionProps {
  dayWeather: string[]
  setDayWeather: Dispatch<SetStateAction<string[]>>
  nightWeather: string[]
  setNightWeather: Dispatch<SetStateAction<string[]>>
  selectedDiseases: string[]
  setIsDiseaseModalOpen: (isOpen: boolean) => void
  preferredPaths: string[]
  setPreferredPaths: Dispatch<SetStateAction<string[]>>
  personality: string
  setPersonality: Dispatch<SetStateAction<string>>
  weight: string
  setWeight: Dispatch<SetStateAction<string>>
}

function DetailCharacterSection({
  dayWeather,
  setDayWeather,
  nightWeather,
  setNightWeather,
  selectedDiseases,
  setIsDiseaseModalOpen,
  preferredPaths,
  setPreferredPaths,
  personality,
  setPersonality,
  weight,
  setWeight,
}: DetailCharacterSectionProps) {
  return (
    <div className="bg-neutral-900 p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-bold text-left mb-4">{UI_TEXT.DETAIL_SECTION_TITLE}</h2>
      <InfoRow label={UI_TEXT.DAY_LABEL}>
        <div className="flex w-full gap-1">
          <IconButton
            icon={<FaRegSun size={20} />}
            isSelected={dayWeather.includes(DAY_WEATHER.SUN)}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes(DAY_WEATHER.SUN)
                  ? prev.filter((item) => item !== DAY_WEATHER.SUN)
                  : [...prev, DAY_WEATHER.SUN],
              )
            }
          />
          <IconButton
            icon={<FaCloudSun size={20} />}
            isSelected={dayWeather.includes(DAY_WEATHER.CLOUDY)}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes(DAY_WEATHER.CLOUDY)
                  ? prev.filter((item) => item !== DAY_WEATHER.CLOUDY)
                  : [...prev, DAY_WEATHER.CLOUDY],
              )
            }
          />
          <IconButton
            icon={<IoRainyOutline size={20} />}
            isSelected={dayWeather.includes(DAY_WEATHER.RAIN)}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes(DAY_WEATHER.RAIN)
                  ? prev.filter((item) => item !== DAY_WEATHER.RAIN)
                  : [...prev, DAY_WEATHER.RAIN],
              )
            }
          />
          <IconButton
            icon={<RiSnowyLine size={20} />}
            isSelected={dayWeather.includes(DAY_WEATHER.SNOW)}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes(DAY_WEATHER.SNOW)
                  ? prev.filter((item) => item !== DAY_WEATHER.SNOW)
                  : [...prev, DAY_WEATHER.SNOW],
              )
            }
          />
          <IconButton
            icon={<TiWeatherWindy size={20} />}
            isSelected={dayWeather.includes(DAY_WEATHER.WIND)}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes(DAY_WEATHER.WIND)
                  ? prev.filter((item) => item !== DAY_WEATHER.WIND)
                  : [...prev, DAY_WEATHER.WIND],
              )
            }
          />
        </div>
      </InfoRow>

      <InfoRow label={UI_TEXT.NIGHT_LABEL}>
        <div className="flex w-full gap-1">
          <IconButton
            icon={<FaRegMoon size={20} />}
            isSelected={nightWeather.includes(NIGHT_WEATHER.MOON)}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes(NIGHT_WEATHER.MOON)
                  ? prev.filter((item) => item !== NIGHT_WEATHER.MOON)
                  : [...prev, NIGHT_WEATHER.MOON],
              )
            }
          />
          <IconButton
            icon={<CiCloudMoon size={20} />}
            isSelected={nightWeather.includes(NIGHT_WEATHER.CLOUDY_NIGHT)}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes(NIGHT_WEATHER.CLOUDY_NIGHT)
                  ? prev.filter((item) => item !== NIGHT_WEATHER.CLOUDY_NIGHT)
                  : [...prev, NIGHT_WEATHER.CLOUDY_NIGHT],
              )
            }
          />
          <IconButton
            icon={<IoRainyOutline size={20} />}
            isSelected={nightWeather.includes(NIGHT_WEATHER.RAINY_NIGHT)}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes(NIGHT_WEATHER.RAINY_NIGHT)
                  ? prev.filter((item) => item !== NIGHT_WEATHER.RAINY_NIGHT)
                  : [...prev, NIGHT_WEATHER.RAINY_NIGHT],
              )
            }
          />
          <IconButton
            icon={<RiSnowyLine size={20} />}
            isSelected={nightWeather.includes(NIGHT_WEATHER.SNOWY_NIGHT)}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes(NIGHT_WEATHER.SNOWY_NIGHT)
                  ? prev.filter((item) => item !== NIGHT_WEATHER.SNOWY_NIGHT)
                  : [...prev, NIGHT_WEATHER.SNOWY_NIGHT],
              )
            }
          />
          <IconButton
            icon={<TiWeatherWindy size={20} />}
            isSelected={nightWeather.includes(NIGHT_WEATHER.WINDY_NIGHT)}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes(NIGHT_WEATHER.WINDY_NIGHT)
                  ? prev.filter((item) => item !== NIGHT_WEATHER.WINDY_NIGHT)
                  : [...prev, NIGHT_WEATHER.WINDY_NIGHT],
              )
            }
          />
        </div>
      </InfoRow>

      <InfoRow label={UI_TEXT.DISEASE_LABEL}>
        <button
          onClick={() => setIsDiseaseModalOpen(true)}
          className="w-full text-left bg-neutral-700 p-2 rounded-md text-sm text-neutral-300 truncate"
        >
          {selectedDiseases.length > 0
            ? selectedDiseases.join(', ')
            : UI_TEXT.SELECT_DISEASE_PLACEHOLDER}
        </button>
      </InfoRow>

      <InfoRow label={UI_TEXT.PATH_LABEL}>
        <div className="flex justify-around w-full">
          <IconButton
            icon={<img src={Road} className="object-cover" alt={PREFERRED_PATHS.ASPHALT} />}
            isSelected={preferredPaths.includes(PREFERRED_PATHS.ASPHALT)}
            onClick={() =>
              setPreferredPaths((prev) =>
                prev.includes(PREFERRED_PATHS.ASPHALT)
                  ? prev.filter((item) => item !== PREFERRED_PATHS.ASPHALT)
                  : [...prev, PREFERRED_PATHS.ASPHALT],
              )
            }
          />
          <IconButton
            icon={
              <img
                src={GrassRoad}
                className="text-green-500 w-full h-auto"
                alt={PREFERRED_PATHS.TRAIL}
              />
            }
            isSelected={preferredPaths.includes(PREFERRED_PATHS.TRAIL)}
            onClick={() =>
              setPreferredPaths((prev) =>
                prev.includes(PREFERRED_PATHS.TRAIL)
                  ? prev.filter((item) => item !== PREFERRED_PATHS.TRAIL)
                  : [...prev, PREFERRED_PATHS.TRAIL],
              )
            }
          />
          <IconButton
            icon={<img src={DirtRoad} alt={PREFERRED_PATHS.DIRT} />}
            isSelected={preferredPaths.includes(PREFERRED_PATHS.DIRT)}
            onClick={() =>
              setPreferredPaths((prev) =>
                prev.includes(PREFERRED_PATHS.DIRT)
                  ? prev.filter((item) => item !== PREFERRED_PATHS.DIRT)
                  : [...prev, PREFERRED_PATHS.DIRT],
              )
            }
          />
        </div>
      </InfoRow>

      <InfoRow label={UI_TEXT.WEIGHT_LABEL}>
        <input
          className="w-full bg-neutral-700 p-2 rounded-md text-sm text-center"
          value={weight}
          inputMode="numeric"
          onChange={(e) => {
            const newValue = e.target.value
            if (/^\d*$/.test(newValue)) setWeight(newValue)
          }}
          onBlur={() => {
            if (weight === '' || isNaN(Number(weight))) setWeight('20')
          }}
        />
        <span>{UNIT_OF_MEASURE.KG}</span>
      </InfoRow>

      <InfoRow label={UI_TEXT.PERSONALITY_LABEL} className="border-none">
        <button
          onClick={() => setPersonality(PERSONALITY.EXTROVERTED)}
          className={`w-full p-3 rounded-md text-sm font-semibold ${
            personality === PERSONALITY.EXTROVERTED ? 'bg-blue-600' : 'bg-neutral-700'
          }`}
        >
          {UI_TEXT.PERSONALITY_EXTROVERTED}
        </button>
        <button
          onClick={() => setPersonality(PERSONALITY.INTROVERTED)}
          className={`w-full p-3 rounded-md text-sm font-semibold ${
            personality === PERSONALITY.INTROVERTED ? 'bg-blue-600' : 'bg-neutral-700'
          }`}
        >
          {UI_TEXT.PERSONALITY_INTROVERTED}
        </button>
      </InfoRow>
    </div>
  )
}
export default DetailCharacterSection
