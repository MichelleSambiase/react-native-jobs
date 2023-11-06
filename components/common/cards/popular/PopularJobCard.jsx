import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'
import { checkImageURL } from '../../../../utils'

const defaultImg =
	'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
	const { employer_logo, employer_name, job_country, job_title } = item

	return (
		<TouchableOpacity
			style={styles.container(selectedJob, item)}
			onPress={() => handleCardPress(item)}>
			<TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
				<Image
					source={{
						uri: checkImageURL(employer_logo) ? employer_logo : defaultImg
					}}
					resizeMode='contain'
					style={styles.logoImage}
				/>
			</TouchableOpacity>
			<Text style={styles.companyName} numberOfLines={1}>
				{employer_name}
			</Text>
			<View style={styles.infoContainer}>
				<Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
					{job_title}
				</Text>
				<Text style={styles.location}>{job_country}</Text>
			</View>
		</TouchableOpacity>
	)
}

export default PopularJobCard
