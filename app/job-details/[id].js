import React, { useCallback, useState } from 'react'
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	RefreshControl
} from 'react-native'

import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import {
	Company,
	JobAbout,
	jobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics
} from '../../components'

import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilities']
const googleCareers = 'https://careers.google.com.jobs/results'

const JobDetails = () => {
	const [refreshing, setRefreshing] = useState(false)
	const [activeTab, setActiveTab] = useState(tabs[0])

	const params = useLocalSearchParams()
	const router = useRouter()

	const { data, error, isLoading, refetch } = useFetch('job-details', {
		job_id: params.id
	})

	const jobUrl = data[0]?.job_google_link

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		refetch()
		setRefreshing(false)
	})

	const displayTabContent = () => {
		const jobQualifications = data[0].job_highlights?.Qualifications
		const jobDescription = data[0].job_description
		const jobResponsibilities = data[0].job_highlights?.Responsibilities

		switch (activeTab) {
			case 'Qualifications':
				return (
					<Specifics
						title='Qualifications'
						points={jobQualifications ?? ['N/A']}
					/>
				)
			case 'About':
				return <JobAbout info={jobDescription ?? ['No data provided']} />

			case 'Responsibilities':
				return (
					<Specifics
						title='Responsibilities'
						points={jobResponsibilities ?? ['N/A']}
					/>
				)
			default:
				break
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerTitle: '',
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension='60%'
							handlePress={() => router.back()}
						/>
					),
					headerRight: () => (
						<ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
					)
				}}
			/>
			<>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}>
					{isLoading ? (
						<ActivityIndicator size='large' color={COLORS.primary} />
					) : error ? (
						<Text>Something wen wrong</Text>
					) : data.length === 0 ? (
						<Text>No data</Text>
					) : (
						<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
							<Company
								companyLogo={data[0].employer_logo}
								jobTitle={data[0].job_title}
								companyName={data[0].employer_name}
								location={data[0].job_country}
							/>

							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>

							{displayTabContent()}
						</View>
					)}
				</ScrollView>
				<JobFooter url={jobUrl ?? googleCareers} />
			</>
		</SafeAreaView>
	)
}

export default JobDetails
