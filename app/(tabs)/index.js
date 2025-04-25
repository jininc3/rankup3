import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for now - will be replaced with Firebase data
  useEffect(() => {
    const mockPosts = [
      {
        id: '1',
        username: 'FraGMaster',
        userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        game: 'Apex Legends',
        rank: 'Diamond',
        content: 'Just hit Diamond in Apex! Let\'s goooo!',
        likes: 24,
        comments: 5,
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        username: 'NinjaSniper',
        userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        game: 'Valorant',
        rank: 'Immortal',
        content: 'Looking for serious teammates for tournament practice.',
        likes: 42,
        comments: 12,
        timestamp: new Date().toISOString(),
      },
    ];
    
    // Simulate loading from database
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
    
    // Later, you'll replace this with actual Firebase fetch:
    /*
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
    */
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Avatar
          rounded
          source={{ uri: item.userAvatar }}
          size="medium"
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.gameInfo}>{item.game} • {item.rank}</Text>
        </View>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.postStats}>
        <Text style={styles.statsText}>{item.likes} Likes • {item.comments} Comments</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rankup</Text>
      </View>
      
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      />
      
      <View style={styles.footer}>
        <Button
          title="+ New Post"
          buttonStyle={styles.newPostButton}
          onPress={() => console.log('New Post')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  feedContainer: {
    padding: 10,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  gameInfo: {
    fontSize: 14,
    color: '#666',
  },
  postContent: {
    fontSize: 15,
    marginBottom: 15,
    lineHeight: 22,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  statsText: {
    color: '#666',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  newPostButton: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 10,
  },
});