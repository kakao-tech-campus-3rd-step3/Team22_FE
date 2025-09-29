import IconButton from '@/components/common/IconButton'
import InfoRow from '@/components/common/InfoRow'
import {
  PERSONALITY,
  PREFERRED_PATHS,
  UI_TEXT,
  UNIT_OF_MEASURE,
  WEATHER,
} from '@/constants/constants'

import { FaRegSun } from 'react-icons/fa'
import { FaCloudSun } from 'react-icons/fa6'
import { IoRainyOutline } from 'react-icons/io5'
import { RiSnowyLine } from 'react-icons/ri'
import { TiWeatherWindy } from 'react-icons/ti'
import GrassRoad from '@/assets/GrassRoad.png'
import DirtRoad from '@/assets/DirtRoad.png'
import Road from '@/assets/Road.svg'

const toggleInArray = (
  currentArray: string[],
  setter: (value: string[]) => void,
  value: string,
) => {
  const newArray = currentArray.includes(value)
    ? currentArray.filter((item) => item !== value)
    : [...currentArray, value]
  setter(newArray)
}

function DetailCharacterSection(props: {
  preferredWeather: string[]
  setPreferredWeather: (value: string[]) => void

  chronicDisease: string[]
  setIsDiseaseModalOpen: (isOpen: boolean) => void

  preferredPaths: string[]
  setPreferredPaths: (value: string[]) => void

  personality: 'extroverted' | 'introverted'
  setPersonality: (value: 'extroverted' | 'introverted') => void

  weight: string
  setWeight: (value: string) => void
}) {
  const {
    preferredWeather,
    setPreferredWeather,
    chronicDisease,
    setIsDiseaseModalOpen,
    preferredPaths,
    setPreferredPaths,
    personality,
    setPersonality,
    weight,
    setWeight,
  } = props

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (/^\d*$/.test(newValue)) {
      setWeight(newValue)
    }
  }

  return (
    <div className="bg-neutral-900 p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-bold text-left mb-4">{UI_TEXT.DETAIL_SECTION_TITLE}</h2>

      <InfoRow label={UI_TEXT.WEATHER_LABEL}>
        <div className="w-full grid grid-cols-5 gap-1 ">
          <IconButton
            icon={<FaRegSun size={20} />}
            isSelected={preferredWeather.includes(WEATHER.SUN)}
            onClick={() => toggleInArray(preferredWeather, setPreferredWeather, WEATHER.SUN)}
          />
          <IconButton
            icon={<FaCloudSun size={20} />}
            isSelected={preferredWeather.includes(WEATHER.CLOUDY)}
            onClick={() => toggleInArray(preferredWeather, setPreferredWeather, WEATHER.CLOUDY)}
          />
          <IconButton
            icon={<IoRainyOutline size={20} />}
            isSelected={preferredWeather.includes(WEATHER.RAINY_NIGHT)}
            onClick={() =>
              toggleInArray(preferredWeather, setPreferredWeather, WEATHER.RAINY_NIGHT)
            }
          />
          <IconButton
            icon={<RiSnowyLine size={20} />}
            isSelected={preferredWeather.includes(WEATHER.SNOWY_NIGHT)}
            onClick={() =>
              toggleInArray(preferredWeather, setPreferredWeather, WEATHER.SNOWY_NIGHT)
            }
          />
          <IconButton
            icon={<TiWeatherWindy size={20} />}
            isSelected={preferredWeather.includes(WEATHER.WINDY_NIGHT)}
            onClick={() =>
              toggleInArray(preferredWeather, setPreferredWeather, WEATHER.WINDY_NIGHT)
            }
          />
        </div>
      </InfoRow>

      <InfoRow label={UI_TEXT.DISEASE_LABEL}>
        <button
          onClick={() => setIsDiseaseModalOpen(true)}
          className="w-full text-left bg-neutral-700 p-2 rounded-md text-sm text-neutral-300 truncate"
        >
          {chronicDisease.length > 0
            ? chronicDisease.join(', ')
            : UI_TEXT.SELECT_DISEASE_PLACEHOLDER}
        </button>
      </InfoRow>

      <InfoRow label={UI_TEXT.PATH_LABEL}>
        <div className="flex justify-around w-full">
          <IconButton
            icon={<img src={Road} className="object-cover" alt={PREFERRED_PATHS.ASPHALT} />}
            isSelected={preferredPaths.includes(PREFERRED_PATHS.ASPHALT)}
            onClick={() =>
              toggleInArray(preferredPaths, setPreferredPaths, PREFERRED_PATHS.ASPHALT)
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
            onClick={() => toggleInArray(preferredPaths, setPreferredPaths, PREFERRED_PATHS.TRAIL)}
          />
          <IconButton
            icon={<img src={DirtRoad} alt={PREFERRED_PATHS.DIRT} />}
            isSelected={preferredPaths.includes(PREFERRED_PATHS.DIRT)}
            onClick={() => toggleInArray(preferredPaths, setPreferredPaths, PREFERRED_PATHS.DIRT)}
          />
        </div>
      </InfoRow>

      <InfoRow label={UI_TEXT.WEIGHT_LABEL}>
        <input
          className="w-full bg-neutral-700 p-2 rounded-md text-sm text-center"
          value={weight}
          inputMode="numeric"
          onChange={handleWeightChange}
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
