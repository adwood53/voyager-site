// src/app/components/dashboard/panels/admin/MemberManagement.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';

/**
 * MemberManagement component - Handles organization member management
 */
export default function MemberManagement({
  organization,
  currentUser,
  membership,
}) {
  // Invitation modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('org:member');
  const [inviteStatus, setInviteStatus] = useState({
    type: '',
    message: '',
  });
  const [isInviting, setIsInviting] = useState(false);

  // Members data state
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check user permissions
  const isAdmin = membership?.role === 'org:admin';

  /**
   * Load organization members
   */
  const loadMembers = useCallback(async () => {
    if (!organization) return;

    try {
      setIsLoading(true);
      const response = await organization.getMemberships({
        limit: 100,
      });

      setMembers(response.data || []);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setIsLoading(false);
    }
  }, [organization]);

  // Load members when component mounts
  useEffect(() => {
    if (organization) {
      loadMembers();
    }
  }, [organization, loadMembers]);

  /**
   * Handle member invitation
   */
  const handleInvite = async (e) => {
    e.preventDefault();

    if (!inviteEmail.trim()) {
      setInviteStatus({
        type: 'error',
        message: 'Email address is required',
      });
      return;
    }

    setIsInviting(true);
    setInviteStatus({ type: '', message: '' });

    try {
      await organization.inviteMember({
        emailAddress: inviteEmail.trim(),
        role: inviteRole,
      });

      setInviteStatus({
        type: 'success',
        message: `Invitation sent to ${inviteEmail}`,
      });

      setInviteEmail('');
      loadMembers();

      // Close modal after success
      setTimeout(() => {
        onClose();
        setInviteStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error inviting member:', error);
      setInviteStatus({
        type: 'error',
        message: error.message || 'Failed to send invitation',
      });
    } finally {
      setIsInviting(false);
    }
  };

  /**
   * Handle member removal with improved error handling
   */
  const handleRemoveMember = async (membershipId) => {
    // Allow only admins to remove members
    if (!isAdmin) {
      console.warn('Remove attempt by non-admin user');
      return;
    }

    // Confirm before removing
    if (!confirm('Are you sure you want to remove this member?'))
      return;

    try {
      // Get the organization membership directly
      const memberships = await organization.getMemberships({
        limit: 100,
      });

      // Find the specific membership to remove
      const membershipToRemove = memberships.data.find(
        (m) => m.id === membershipId
      );

      if (membershipToRemove) {
        // Use the membership object's destroy method (Clerk's recommended approach)
        await membershipToRemove.destroy();
        console.log('Member successfully removed');
      } else {
        // Fallback to the organization method if membership not found
        await organization.removeMember(membershipId);
        console.log('Member removed using fallback method');
      }

      // Update local state
      setMembers((prev) => prev.filter((m) => m.id !== membershipId));

      // Reload members list
      setTimeout(() => {
        loadMembers();
      }, 500);
    } catch (error) {
      console.error('Error removing member:', error);
      alert(
        `Error removing member: ${error.message || 'Unknown error'}`
      );
    }
  };

  /**
   * Gets the member's primary email address
   */
  const getMemberEmail = (member) => {
    // Check if the member has publicUserData with emailAddresses
    if (member.publicUserData?.emailAddresses?.[0]?.emailAddress) {
      return member.publicUserData.emailAddresses[0].emailAddress;
    }

    // Check for identifier that might contain an email
    if (member.publicUserData?.identifier) {
      const identifier = member.publicUserData.identifier;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
        return identifier;
      }
    }

    // As a last resort, check for any email property
    if (member.publicUserData?.email) {
      return member.publicUserData.email;
    }

    return 'No email available';
  };

  /**
   * Get member name
   */
  const getMemberName = (member) => {
    const firstName = member.publicUserData?.firstName || '';
    const lastName = member.publicUserData?.lastName || '';
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    return 'Unknown Member';
  };

  /**
   * Get role display name
   */
  const getRoleDisplay = (role) => {
    const roleMap = {
      'org:admin': 'Admin',
      'org:member': 'Member',
    };
    return roleMap[role] || 'Member';
  };

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Team Members
          </h2>
          <Button
            color="primary"
            onClick={onOpen}
            disabled={!isAdmin}
            style={{
              backgroundColor: 'var(--primary-color, #E79023)',
              color: '#FFFFFF',
              opacity: isAdmin ? 1 : 0.5,
            }}
          >
            Invite Member
          </Button>
        </CardHeader>
        <CardBody>
          {/* Members table */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.length > 0 ? (
                    members.map((member) => {
                      const isCurrentUser =
                        member.publicUserData?.userId ===
                        currentUser?.id;
                      const memberEmail = getMemberEmail(member);
                      const memberName = getMemberName(member);
                      const memberRole = getRoleDisplay(member.role);
                      const isActive =
                        !!member.publicUserData?.identifier;

                      return (
                        <tr key={member.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="relative h-10 w-10 flex-shrink-0">
                                <Image
                                  src={
                                    member.publicUserData?.imageUrl ||
                                    '/placeholder-avatar.jpg'
                                  }
                                  alt={memberName}
                                  fill
                                  className="rounded-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {memberName}
                                  {isCurrentUser && ' (You)'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  <a
                                    href={`mailto:${memberEmail}`}
                                    className="hover:underline text-primary-color"
                                    style={{
                                      color:
                                        'var(--primary-color, #E79023)',
                                    }}
                                  >
                                    {memberEmail}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {memberRole}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isActive ? (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {isAdmin && !isCurrentUser ? (
                              <Button
                                size="sm"
                                color="danger"
                                onClick={() =>
                                  handleRemoveMember(member.id)
                                }
                                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-md px-4 py-1"
                              >
                                Remove
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                disabled
                                className="opacity-50"
                              >
                                {isCurrentUser ? 'You' : 'Remove'}
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          backdrop: 'bg-black/50 backdrop-blur-sm',
          base: 'bg-white border border-gray-200 shadow-xl',
          body: 'p-6 bg-white',
          header: 'bg-white border-b border-gray-200 p-6',
          footer: 'bg-white border-t border-gray-200 p-6',
        }}
      >
        <ModalContent>
          <ModalHeader>Invite Team Member</ModalHeader>
          <ModalBody className="text-gray-800">
            <form id="invite-form" onSubmit={handleInvite}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  required
                  className="w-full bg-white text-gray-800 border border-gray-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-800"
                >
                  <option value="org:admin">Admin</option>
                  <option value="org:member">Member</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Admins can manage the organization. Members have
                  limited access.
                </p>
              </div>

              {inviteStatus.message && (
                <div
                  className={`mb-4 p-3 rounded-md ${
                    inviteStatus.type === 'error'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {inviteStatus.message}
                </div>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="invite-form"
              color="primary"
              style={{
                backgroundColor: 'var(--primary-color, #E79023)',
                color: '#FFFFFF',
              }}
              disabled={isInviting}
            >
              {isInviting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
