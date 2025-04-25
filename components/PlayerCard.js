import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';

// Get screen width for sizing
const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

const PlayerCard = ({ player, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      <View 
        style={[
          styles.card, 
          { borderColor: getRankColor(player.rank) }
        ]}
      >
        {/* Game logo in top left */}
        <View style={styles.gameLogo}>
          {getGameLogo(player.mainGame)}
        </View>
        
        {/* Player name at top */}
        <Text style={styles.playerName}>{player.username.toUpperCase()}</Text>
        
        {/* Profile image */}
        <View style={[styles.profileImageContainer, { borderColor: getRankColor(player.rank) }]}>
          <Image 
            source={{ uri: player.avatarUrl }} 
            style={styles.profileImage}
          />
        </View>
        
        {/* Rank badge */}
        <View style={styles.rankBadgeContainer}>
          <View style={styles.rankBadge}>
            {getRankBadge(player.rank)}
          </View>
          <Text style={styles.rankName}>{player.rank.toUpperCase()}</Text>
        </View>
        
        {/* Achievement or status */}
        <Text style={styles.achievementText}>
          {getPlayerAchievement(player)}
        </Text>
        
        {/* Game name at bottom */}
        <Text style={[styles.gameName, { color: getRankColor(player.rank) }]}>
          {player.mainGame.toUpperCase()}
        </Text>
        
        {/* Stats button */}
        <TouchableOpacity style={[styles.statsButton, { borderColor: getRankColor(player.rank) }]}>
          <Icon 
            name="hand-pointer" 
            type="font-awesome-5" 
            size={14} 
            color={getRankColor(player.rank)}
          />
          <Text style={[styles.statsButtonText, { color: getRankColor(player.rank) }]}>
            TAP FOR STATS
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Get game-specific logo/icon
const getGameLogo = (game) => {
  // For now using simple icons, but these could be replaced with actual game logos
  const logoMap = {
    'Valorant': 
      <View style={styles.valorantLogo}>
        <Icon name="triangle" type="font-awesome-5" color="#FF4655" size={15} solid />
        <Icon name="triangle" type="font-awesome-5" color="#FF4655" size={15} solid style={styles.flippedTriangle} />
      </View>,
    'League of Legends': 
      <Icon name="chess" type="font-awesome-5" color="#C89B3C" size={24} solid />,
    'Apex Legends': 
      <Icon name="bullseye" type="font-awesome-5" color="#DA292A" size={24} solid />,
    'Call of Duty': 
      <Icon name="skull" type="font-awesome-5" color="#FF6946" size={24} solid />,
    'Overwatch': 
      <Icon name="shield-alt" type="font-awesome-5" color="#FA9C1E" size={24} solid />,
  };
  
  return logoMap[game] || <Icon name="gamepad" type="font-awesome-5" color="#FFF" size={24} solid />;
};

// Get rank badge based on rank name
const getRankBadge = (rank) => {
  // Using basic shapes for now - these would be replaced with actual rank images
  const rankIcons = {
    'Bronze': <Icon name="medal" type="font-awesome-5" color="#cd7f32" size={60} solid />,
    'Silver': <Icon name="medal" type="font-awesome-5" color="#c0c0c0" size={60} solid />,
    'Gold': <Icon name="medal" type="font-awesome-5" color="#ffd700" size={60} solid />,
    'Platinum': 
      <View style={[styles.rankIconBg, { backgroundColor: '#e5e4e2' }]}>
        <Icon name="gem" type="font-awesome-5" color="#36454F" size={35} solid />
      </View>,
    'Diamond': 
      <View style={[styles.rankIconBg, { backgroundColor: '#b9f2ff' }]}>
        <Icon name="gem" type="font-awesome-5" color="#4F86F7" size={35} solid />
      </View>,
    'Master': 
      <View style={[styles.rankIconBg, { backgroundColor: '#9370db' }]}>
        <Icon name="crown" type="font-awesome-5" color="#FFF" size={35} solid />
      </View>,
    'Grandmaster': <Icon name="chess-king" type="font-awesome-5" color="#ff4500" size={60} solid />,
    'Challenger': <Icon name="trophy" type="font-awesome-5" color="#ff8c00" size={60} solid />,
    'Immortal': 
      <View style={[styles.rankIconBg, { backgroundColor: '#FF5252' }]}>
        <Icon name="fire" type="font-awesome-5" color="#FFF" size={35} solid />
      </View>,
    'Radiant': <Icon name="sun" type="font-awesome-5" color="#00ffff" size={60} solid />,
  };
  
  return rankIcons[rank] || <Icon name="star" type="font-awesome-5" color="#FFD700" size={60} solid />;
};

// Get player achievement/status based on their stats
const getPlayerAchievement = (player) => {
  if (player.wins > 300) return "*TOP PERFORMER";
  if (player.kd > 3.0) return "*HIGH K/D RATIO";
  if (player.wins > 200) return "*GAME WINNER";
  
  // Game-specific achievements
  if (player.mainGame === "Valorant") return "*ACE CLUTCHER";
  if (player.mainGame === "League of Legends") return "*SMITE WINNER";
  if (player.mainGame === "Apex Legends") return "*APEX PREDATOR";
  
  return "*ACTIVE PLAYER";
};

// Helper function to determine rank color
const getRankColor = (rank) => {
  const rankColors = {
    'Bronze': '#cd7f32',
    'Silver': '#c0c0c0',
    'Gold': '#ffd700',
    'Platinum': '#4AFAFF',
    'Diamond': '#56DDFF',
    'Master': '#9370db',
    'Grandmaster': '#ff4500',
    'Challenger': '#ff8c00',
    'Immortal': '#ff4040',
    'Radiant': '#00ffff',
  };
  
  return rankColors[rank] || '#4AFAFF'; // Default cyan
};

const styles = StyleSheet.create({
  cardWrapper: {
    alignItems: 'center',
    marginVertical: 12,
  },
  card: {
    width: cardWidth,
    height: cardWidth * 1.4, // Roughly card proportions
    borderWidth: 3,
    borderRadius: 12,
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gameLogo: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  valorantLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flippedTriangle: {
    transform: [{ rotate: '180deg' }],
    marginLeft: -5,
  },
  playerName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  rankBadgeContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  rankBadge: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  achievementText: {
    color: '#BBB',
    fontSize: 12,
    marginVertical: 5,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  statsButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default PlayerCard;