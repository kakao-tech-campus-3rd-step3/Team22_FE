import { z } from 'zod'
import { BREED_VALUES, GENDER_VALUES, PERSONALITY_VALUES } from '@/constants/constants'

export const petProfileSchema = z.object({
  name: z.string().nonempty(),
  selectedBreed: z.enum(BREED_VALUES, { message: '견종을 선택해주세요.' }),
  gender: z.enum(GENDER_VALUES),
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
  personality: z.enum(PERSONALITY_VALUES),
  preferredPaths: z.array(z.string()).nonempty({ message: '산책로를 선택해주세요.' }),
  preferredWeather: z.array(z.string()).nonempty({ message: '날씨를 선택해주세요.' }),
  chronicDisease: z.array(z.string()).optional(),
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
