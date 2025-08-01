import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookProviderModal = ({ visible, onClose, onBook, provider }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Book {provider?.name || 'Provider'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#ccc"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={{ color: date ? '#fff' : '#ccc' }}>{date || 'Select Date'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text style={{ color: time ? '#fff' : '#ccc' }}>{time || 'Select Time'}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Note (optional)"
            placeholderTextColor="#ccc"
            value={note}
            onChangeText={setNote}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date ? new Date(date) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selected) => {
                setShowDatePicker(false);
                if (selected) setDate(selected.toISOString().split('T')[0]);
              }}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={time ? new Date(`1970-01-01T${time}:00`) : new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selected) => {
                setShowTimePicker(false);
                if (selected) {
                  const t = selected.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  setTime(t);
                }
              }}
            />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() => onBook({ date, time, address, note })}
              disabled={!date || !time || !address}
            >
              <Text style={styles.bookBtnText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1A2D23',
    borderRadius: 16,
    padding: 24,
    width: '90%',
  },
  title: {
    color: '#2BF067',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2D4435',
    borderRadius: 8,
    color: '#fff',
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookBtn: {
    backgroundColor: '#2BF067',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  bookBtnText: {
    color: '#0F2018',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookProviderModal;
