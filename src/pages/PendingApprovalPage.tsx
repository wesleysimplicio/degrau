import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Check, Close, Visibility } from '@mui/icons-material';
import { dashboardService } from '../services/dashboardService';
import { PendingApprovalUser } from '../models/userModels';
import { format } from 'date-fns';

const PendingApprovalPage: React.FC = () => {
  const [users, setUsers] = useState<PendingApprovalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<PendingApprovalUser | null>(null);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getPendingApprovalUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar usuários pendentes. Por favor, tente novamente.');
      console.error('Error fetching pending users:', err);
    } finally {
      setLoading(false);
    }
  };

  // ... Rest of the component remains the same as before
  // ...existing code...
};

export default PendingApprovalPage;
