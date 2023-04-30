'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './Floating.module.scss';

interface FloatingProps {
  offsetLeft?: number;
  offsetTop?: number;
  icon: StaticImageData;
}

const Floating = ({ offsetLeft = 0, offsetTop = 0, icon }: FloatingProps) => {
  return (
    <div
      aria-hidden="true"
      style={{
        left: `${offsetLeft}%`,
        top: `${offsetTop}%`,
      }}
      className={styles.floating}
    >
      <Image src={icon} alt={'morska ikona'} width={64} height={64} />
    </div>
  );
};

export default Floating;
