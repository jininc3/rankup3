import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    setIsLoading(true);
    setErrorMessage('');
    
    // Validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      setIsLoading(false);
      return;
    }
    
    // Mock sign-in process
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to the home tab after successful sign-in
      // In a real implementation, this would happen after Firebase auth
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Logo and branding */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo-placeholder.png')} 
              style={styles.logo}
              resizeMode="contain" 
            />
            <Text style={styles.appName}>RANKUP</Text>
            <Text style={styles.tagline}>Competitive Gaming, Elevated</Text>
          </View>
          
          {/* Sign-in form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Sign In</Text>
            
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            
            <TouchableOpacity onPress={() => console.log('Forgot password')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.signInButton, isLoading ? styles.disabledButton : null]}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              <Text style={styles.signInButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
            
            {/* Social sign-in options - not functional yet */}
            <View style={styles.socialContainer}>
              <Text style={styles.orText}>OR</Text>
              
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>Discord</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Footer with sign-up link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#bbb',
  },
  formContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: 'white',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#6200ee',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#4a0099',
    opacity: 0.7,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialContainer: {
    alignItems: 'center',
  },
  orText: {
    color: '#aaa',
    marginVertical: 15,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    width: '45%',
    alignItems: 'center',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#bbb',
    fontSize: 14,
  },
  signUpLink: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 15,
    textAlign: 'center',
  },
});