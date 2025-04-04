// src/app/components/dashboard/panels/resources/ResourceCard.js
'use client';

import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';

export default function ResourceCard({ resource, onClick }) {
  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card
        isPressable
        onPress={() => onClick(resource)}
        className="h-full cursor-pointer border hover:shadow-md transition-all overflow-hidden"
      >
        <div
          className="h-28 flex items-center justify-center text-5xl"
          style={{ backgroundColor: `${resource.color}10` }}
        >
          <span>{resource.icon}</span>
        </div>
        <CardBody className="p-4">
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: resource.color }}
          >
            {resource.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {resource.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
              {resource.fileType}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: resource.color }}
            >
              Access →
            </span>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
