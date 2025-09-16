import { z } from 'zod'
import { BREED_VALUES } from '@/constants/constants'

export const defaultPetProfile: PetProfile = {
  selectedBreed: 'Maltese',
  gender: 'male',
  neutralize: false,
  vaccinated: false,
  birthdate: '2020-01-01',
  personality: 'extroverted',
  dayWeather: [''],
  nightWeather: [''],
  preferredPaths: [''],
  selectedDiseases: [''],
  weight: 3,
}

export const petProfileSchema = z.object({
  selectedBreed: z.enum(BREED_VALUES, { message: '견종을 선택해주세요.' }),
  gender: z.enum(['male', 'female']),
  neutralize: z.boolean(),
  vaccinated: z.boolean(),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 YYYY-MM-DD가 아닙니다.')
    .refine((date) => {
      const time = new Date(date).getTime()
      return !isNaN(time)
    }, '유효하지 않은 날짜입니다.')
    .refine((date) => new Date(date) <= new Date(), '생년월일이 현재보다 미래일 수 없습니다.'),
  personality: z.enum(['extroverted', 'introverted']),
  dayWeather: z.array(z.string()).nonempty({ message: '낮 날씨를 선택해주세요.' }),
  nightWeather: z.array(z.string()).nonempty({ message: '밤 날씨를 선택해주세요.' }),
  preferredPaths: z.array(z.string()).nonempty({ message: '산책로를 선택해주세요.' }),
  selectedDiseases: z.array(z.string()).nonempty(),
  weight: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const parsed = Number(val)
        return isNaN(parsed) ? val : parsed
      }
      return val
    },
    z.number().min(1, { message: '몸무게는 1kg 이상이어야 합니다.' }),
  ),
})

export type PetProfile = z.infer<typeof petProfileSchema>
