import IconButton from '@/components/common/IconButton'
import InfoRow from '@/components/common/InfoRow'

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
      <h2 className="text-lg font-bold text-left mb-4">상세설정</h2>
      <InfoRow label="햇님">
        <div className="flex w-full gap-1">
          <IconButton
            icon={<FaRegSun size={20} />}
            isSelected={dayWeather.includes('sun')}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes('sun') ? prev.filter((item) => item !== 'sun') : [...prev, 'sun'],
              )
            }
          />
          <IconButton
            icon={<FaCloudSun size={20} />}
            isSelected={dayWeather.includes('cloudy')}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes('cloudy')
                  ? prev.filter((item) => item !== 'cloudy')
                  : [...prev, 'cloudy'],
              )
            }
          />
          <IconButton
            icon={<IoRainyOutline size={20} />}
            isSelected={dayWeather.includes('rain')}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes('rain') ? prev.filter((item) => item !== 'rain') : [...prev, 'rain'],
              )
            }
          />
          <IconButton
            icon={<RiSnowyLine size={20} />}
            isSelected={dayWeather.includes('snow')}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes('snow') ? prev.filter((item) => item !== 'snow') : [...prev, 'snow'],
              )
            }
          />
          <IconButton
            icon={<TiWeatherWindy size={20} />}
            isSelected={dayWeather.includes('wind')}
            onClick={() =>
              setDayWeather((prev) =>
                prev.includes('wind') ? prev.filter((item) => item !== 'wind') : [...prev, 'wind'],
              )
            }
          />
        </div>
      </InfoRow>

      <InfoRow label="달님">
        <div className="flex w-full gap-1">
          <IconButton
            icon={<FaRegMoon size={20} />}
            isSelected={nightWeather.includes('moon')}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes('moon') ? prev.filter((item) => item !== 'moon') : [...prev, 'moon'],
              )
            }
          />
          <IconButton
            icon={<CiCloudMoon size={20} />}
            isSelected={nightWeather.includes('cloudy-night')}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes('cloudy-night')
                  ? prev.filter((item) => item !== 'cloudy-night')
                  : [...prev, 'cloudy-night'],
              )
            }
          />
          <IconButton
            icon={<IoRainyOutline size={20} />}
            isSelected={nightWeather.includes('rainy-night')}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes('rainy-night')
                  ? prev.filter((item) => item !== 'rainy-night')
                  : [...prev, 'rainy-night'],
              )
            }
          />
          <IconButton
            icon={<RiSnowyLine size={20} />}
            isSelected={nightWeather.includes('snowy-night')}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes('snowy-night')
                  ? prev.filter((item) => item !== 'snowy-night')
                  : [...prev, 'snowy-night'],
              )
            }
          />
          <IconButton
            icon={<TiWeatherWindy size={20} />}
            isSelected={nightWeather.includes('windy-night')}
            onClick={() =>
              setNightWeather((prev) =>
                prev.includes('windy-night')
                  ? prev.filter((item) => item !== 'windy-night')
                  : [...prev, 'windy-night'],
              )
            }
          />
        </div>
      </InfoRow>

      <InfoRow label="지병">
        <button
          onClick={() => setIsDiseaseModalOpen(true)}
          className="w-full text-left bg-neutral-700 p-2 rounded-md text-sm text-neutral-300 truncate"
        >
          {selectedDiseases.length > 0 ? selectedDiseases.join(', ') : '지병 선택'}
        </button>
      </InfoRow>

      <InfoRow label="선호산책로">
        <div className="flex justify-around w-full">
          <IconButton
            icon={<img src={Road} className="object-cover" alt="asphalt road" />}
            isSelected={preferredPaths.includes('asphalt')}
            onClick={() =>
              setPreferredPaths((prev) =>
                prev.includes('asphalt')
                  ? prev.filter((item) => item !== 'asphalt')
                  : [...prev, 'asphalt'],
              )
            }
          />
          <IconButton
            icon={<img src={GrassRoad} className="text-green-500 w-full h-auto" alt="grass road" />}
            isSelected={preferredPaths.includes('trail')}
            onClick={() =>
              setPreferredPaths((prev) =>
                prev.includes('trail')
                  ? prev.filter((item) => item !== 'trail')
                  : [...prev, 'trail'],
              )
            }
          />
          <IconButton
            icon={<img src={DirtRoad} alt="dirt road" />}
            isSelected={preferredPaths.includes('dirt')}
            onClick={() =>
              setPreferredPaths((prev) =>
                prev.includes('dirt') ? prev.filter((item) => item !== 'dirt') : [...prev, 'dirt'],
              )
            }
          />
        </div>
      </InfoRow>

      <InfoRow label="몸무게">
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
        <span>kg</span>
      </InfoRow>

      <InfoRow label="성격" className="border-none">
        <button
          onClick={() => setPersonality('extroverted')}
          className={`w-full p-3 rounded-md text-sm font-semibold ${
            personality === 'extroverted' ? 'bg-blue-600' : 'bg-neutral-700'
          }`}
        >
          외향적
        </button>
        <button
          onClick={() => setPersonality('introverted')}
          className={`w-full p-3 rounded-md text-sm font-semibold ${
            personality === 'introverted' ? 'bg-blue-600' : 'bg-neutral-700'
          }`}
        >
          내향적
        </button>
      </InfoRow>
    </div>
  )
}
export default DetailCharacterSection
