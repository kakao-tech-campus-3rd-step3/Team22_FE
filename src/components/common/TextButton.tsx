import { AppButton } from './AppButton'

export default function TextButton(props: {
  onClick: () => void
  isSelected: boolean
  children?: React.ReactNode
}) {
  const { onClick, isSelected, children } = props
  return (
    <AppButton onClick={onClick} isSelected={isSelected} variant="normal" align="center">
      {children}
    </AppButton>
  )
}
