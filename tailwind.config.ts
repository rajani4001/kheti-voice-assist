
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2E7D32', // Forest Green
					light: '#4CAF50',
					dark: '#1B5E20',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#795548', // Brown
					light: '#A1887F',
					dark: '#5D4037',
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#FFC107', // Amber
					light: '#FFD54F',
					dark: '#FFA000',
					foreground: '#212121'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				cream: {
					DEFAULT: '#F9FBE7', // Light Cream
					light: '#FFFFFF',
					dark: '#F0F4C3',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-ring': {
					'0%': { transform: 'scale(0.8)', opacity: '0.8' },
					'50%': { transform: 'scale(1)', opacity: '0.4' },
					'100%': { transform: 'scale(0.8)', opacity: '0.8' }
				},
				'wave': {
					'0%': { height: '10%' },
					'50%': { height: '70%' },
					'100%': { height: '10%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'wave-1': 'wave 1.2s linear infinite',
				'wave-2': 'wave 1.2s linear infinite -0.1s',
				'wave-3': 'wave 1.2s linear infinite -0.2s',
				'wave-4': 'wave 1.2s linear infinite -0.3s',
				'wave-5': 'wave 1.2s linear infinite -0.4s'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
