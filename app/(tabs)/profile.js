import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { auth } from '../../firebase';
import PlayerCard from '../../components/PlayerCard';

// Get screen width for the grid layout
const { width } = Dimensions.get('window');
const numColumns = 3;
const tileSize = width / numColumns;

export default function Profile() {
  // Mock user data - replace with Firebase Auth user data later
  const [userData, setUserData] = useState({
    username: 'FragMaster22',
    displayName: 'Alex Johnson',
    bio: '🎮 Professional Valorant Player | 💻 Streamer | 🏆 Tournament Champion',
    followers: 1254,
    following: 342,
    posts: 27,
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    stats: {
      rank: 'Immortal',
      mainGame: 'Valorant',
      winRate: '68%',
      kd: 2.7
    }
  });

  // Mock player cards data for the posts (controller) tab
  const [playerCards, setPlayerCards] = useState([
    {
      id: '1',
      username: 'FragMaster22',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      rank: 'Immortal',
      mainGame: 'Valorant',
      wins: 347,
      kd: 2.7
    },
    {
      id: '2',
      username: 'SharpShooter99',
      avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      rank: 'Diamond',
      mainGame: 'Apex Legends',
      wins: 201,
      kd: 3.1
    },
    {
      id: '3',
      username: 'ProSniper420',
      avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
      rank: 'Master',
      mainGame: 'Call of Duty',
      wins: 189,
      kd: 2.4
    }
  ]);

  // Mock post data - replace with Firestore data later
  const [posts, setPosts] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i.toString(),
      image: `https://picsum.photos/500/500?random=${i}`,
      likes: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 20) + 5,
    }))
  );

  // Tabs for different content types
  const [activeTab, setActiveTab] = useState('clips');

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postTile}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.postImage}
      />
    </TouchableOpacity>
  );

  const renderStatsBox = (label, value) => (
    <View style={styles.statsBox}>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with username */}
        <View style={styles.header}>
          <Text style={styles.headerUsername}>{userData.username}</Text>
        </View>

        {/* Profile info section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: userData.profileImage }} 
              style={styles.profileImage}
            />
            
            <View style={styles.profileStats}>
              {renderStatsBox('Posts', userData.posts)}
              {renderStatsBox('Followers', userData.followers)}
              {renderStatsBox('Following', userData.following)}
            </View>
          </View>
          
          <View style={styles.bioSection}>
            <Text style={styles.displayName}>{userData.displayName}</Text>
            <Text style={styles.bio}>{userData.bio}</Text>
          </View>
          
          <View style={styles.rankSection}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{userData.stats.rank}</Text>
            </View>
            <Text style={styles.gameStats}>
              {userData.stats.mainGame} • {userData.stats.winRate} WR • {userData.stats.kd} K/D
            </Text>
          </View>
          
          <View style={styles.buttonSection}>
            <Button 
              title="Edit Profile" 
              buttonStyle={styles.editButton} 
              titleStyle={styles.editButtonText}
            />
            <Button 
              title="Share Profile" 
              buttonStyle={styles.shareButton} 
              titleStyle={styles.shareButtonText}
            />
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={styles.tabIcon}>🎮</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'clips' && styles.activeTab]}
            onPress={() => setActiveTab('clips')}
          >
            <Text style={styles.tabIcon}>📹</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tagged' && styles.activeTab]}
            onPress={() => setActiveTab('tagged')}
          >
            <Text style={styles.tabIcon}>🔖</Text>
          </TouchableOpacity>
        </View>
        
        {/* Posts grid */}
        {activeTab === 'posts' && (
          <View style={styles.playerCardsContainer}>
            {playerCards.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onPress={() => console.log(`Viewing ${player.username}'s profile`)}
              />
            ))}
          </View>
        )}
        
        {activeTab === 'clips' && (
          <FlatList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            scrollEnabled={false}
            style={styles.postsGrid}
          />
        )}
        
        {activeTab === 'tagged' && (
          <View style={styles.emptyTabContainer}>
            <Text style={styles.emptyTabText}>No tagged posts</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DADADA',
    alignItems: 'center',
  },
  headerUsername: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statsBox: {
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
  },
  bioSection: {
    marginBottom: 15,
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  rankSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rankBadge: {
    backgroundColor: '#9370db', // Purple for "Immortal" rank
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 10,
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  gameStats: {
    fontSize: 13,
    color: '#666',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingVertical: 8,
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  editButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingVertical: 8,
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  shareButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#DADADA',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#6200ee',
  },
  tabIcon: {
    fontSize: 20,
  },
  postsGrid: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  postTile: {
    width: tileSize,
    height: tileSize,
    padding: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  emptyTabContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  emptyTabText: {
    fontSize: 16,   
    color: '#999',
  },
  playerCardsContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  }
});