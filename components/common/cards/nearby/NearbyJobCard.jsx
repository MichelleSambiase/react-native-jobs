import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style'
import { checkImageURL } from '../../../../utils'

const defaultImg =
	'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
const NearbyJobCard = ({ job, handleNavigate }) => {
	const { employer_logo, job_employment_type, job_country, job_title } = job

	return (
		<TouchableOpacity style={styles.container} onPress={handleNavigate}>
			<TouchableOpacity style={styles.logoContainer}>
				<Image
					source={{
						uri: checkImageURL(employer_logo) ? employer_logo : defaultImg
					}}
					resizeMode='contain'
					style={styles.logoImage}
				/>
			</TouchableOpacity>

			<View style={styles.textContainer}>
				<Text style={styles.jobName} numberOfLines={1}>
					{job_title}
				</Text>
				<Text style={styles.jobType}>{job_employment_type}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default NearbyJobCard
