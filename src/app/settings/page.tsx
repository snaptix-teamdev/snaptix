import { GeneralInformation } from '@/fsd-pages/general-information'

interface SettingsPageProps {
  searchParams: Promise<{ part?: string }>
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const { part } = await searchParams

  return <GeneralInformation part={part} />
}
