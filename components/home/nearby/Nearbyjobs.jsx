import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

import useFetch from '../../../hook/useFetch'

const isLoading = false
const error = false
const NearbyJobs = () => {
	const router = useRouter()

	const { data, isLoading, error } = useFetch('search', {
		query: 'React developer',
		num_pages: 1
	})

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Nearbyjobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show All</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					// Native spinner loading
					<ActivityIndicator size='large' color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					data?.map((job) => {
						const { job_id } = job || null
						return (
							<NearbyJobCard
								job={job}
								key={`nearby-job-${job_id}`}
								// Dynamic routes
								handleNavigate={() => router.push(`/job-details/${job_id}`)}
							/>
						)
					})
				)}
			</View>
		</View>
	)
}

export default NearbyJobs
