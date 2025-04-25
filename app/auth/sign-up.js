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

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    setIsLoading(true);
    setErrorMessage('');
    
    // Basic form validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
      setIsLoading(false);
      return;
    }
    
    // Mock sign-up process
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to onboarding or home after successful sign-up
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
            <Text style={styles.tagline}>Join the Elite Gaming Community</Text>
          </View>
          
          {/* Sign-up form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create Account</Text>
            
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
            
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
            
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            
            <TouchableOpacity 
              style={[styles.signUpButton, isLoading ? styles.disabledButton : null]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.signUpButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
            
            {/* Social sign-up options - not functional yet */}
            <View style={styles.socialContainer}>
              <Text style={styles.orText}>OR SIGN UP WITH</Text>
              
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
          
          {/* Terms and privacy policy */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
          
          {/* Footer with sign-in link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.signInLink}>Sign In</Text>
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
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
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
  signUpButton: {
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
  signUpButtonText: {
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
    fontSize: 12,
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
  termsText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  termsLink: {
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: '#bbb',
    fontSize: 14,
  },
  signInLink: {
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