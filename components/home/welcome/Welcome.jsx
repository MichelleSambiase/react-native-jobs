import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	Image
} from 'react-native'

import styles from './welcome.style'
import { useRouter } from 'expo-router'
import { SIZES, icons } from '../../../constants'

const jobsType = ['Full-time', 'Part-time', 'Contractor']

const Welcome = ({ searchTeam, setSearchTeam, handleClick }) => {
	const [activeJobType, setActiveJobType] = useState('Full-time')
	const router = useRouter()

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.userName}>Hello Michelle</Text>
				<Text style={styles.welcomeMessage}>Find your perfect job</Text>
			</View>

			<View style={styles.containerRow}>
				<View style={styles.searchWrapper}>
					<TextInput
						style={styles.searchInput}
						value={searchTeam}
						onChangeText={(text) => setSearchTeam(text)}
						placeholder='What are you looking for?'
					/>
				</View>
				{/* Input search */}
				<TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
					<Image
						source={icons.search}
						resizeMode='contain'
						style={styles.searchBtnImage}
						width={50}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.tabsContainer}>
				{/* how to render a list */}
				<FlatList
					data={jobsType}
					renderItem={({ item }) => (
						// touchable button for mobile
						<TouchableOpacity
							onPress={() => {
								setActiveJobType(item)
								router.push(`/search/${item}`)
							}}
							style={styles.tab(activeJobType, item)}>
							<Text style={styles.tabText(activeJobType, item)}>{item}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item}
					contentContainerStyle={{
						columnGap: SIZES.small
					}}
					horizontal
				/>
			</View>
		</View>
	)
}

export default Welcome
