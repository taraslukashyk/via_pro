import React, { useMemo } from 'react';
import { Section } from '../Section';
import { UkraineMap } from './UkraineMap';
import { MapPin } from './MapPin';
import { ClusteredMapPin } from './ClusteredMapPin';
import { PROJECTS, latLngToSvgCoords } from '../../../data/projects';
import type { Project } from '../../../data/projects';
import { useTranslation } from '../../../translations';
import { useLanguage } from '../../../contexts/LanguageContext';

// Distance threshold for clustering pins (in percentage of map size)
const CLUSTER_THRESHOLD = 3;

interface ClusterGroup {
    projects: Project[];
    x: number;
    y: number;
}

function clusterProjects(projects: Project[]): ClusterGroup[] {
    const clusters: ClusterGroup[] = [];
    const processed = new Set<number>();

    for (const project of projects) {
        if (processed.has(project.id)) continue;

        const { x, y } = latLngToSvgCoords(project.lat, project.lng);
        const cluster: Project[] = [project];
        processed.add(project.id);

        // Find nearby projects
        for (const other of projects) {
            if (processed.has(other.id)) continue;

            const { x: ox, y: oy } = latLngToSvgCoords(other.lat, other.lng);
            const distance = Math.sqrt(Math.pow(x - ox, 2) + Math.pow(y - oy, 2));

            if (distance < CLUSTER_THRESHOLD) {
                cluster.push(other);
                processed.add(other.id);
            }
        }

        // Calculate center of cluster
        let centerX = 0, centerY = 0;
        for (const p of cluster) {
            const coords = latLngToSvgCoords(p.lat, p.lng);
            centerX += coords.x;
            centerY += coords.y;
        }

        clusters.push({
            projects: cluster,
            x: centerX / cluster.length,
            y: centerY / cluster.length
        });
    }

    return clusters;
}

export const MapSection: React.FC = () => {
    const t = useTranslation();
    const { language } = useLanguage();
    const clusters = useMemo(() => clusterProjects(PROJECTS[language] as Project[]), [language]);

    return (
        <Section className="py-20 relative overflow-hidden">
            <div className="text-center mb-16 relative z-10">
                <span className="text-accent font-medium tracking-widest uppercase mb-4 block">{t.geography.heading}</span>
                <h2 className="text-4xl md:text-5xl font-bold">{t.geography.subheading}</h2>
                <p className="mt-4 text-foreground/60 max-w-xl mx-auto">
                    {t.geography.description}
                </p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto aspect-[3/2] bg-background/50 rounded-3xl p-4 md:p-8">
                <div className="relative w-full h-full">
                    <UkraineMap />

                    {/* Render Pins - clustered if overlapping */}
                    {clusters.map((cluster, index) => {
                        if (cluster.projects.length === 1) {
                            // Single project - regular pin
                            return (
                                <MapPin
                                    key={cluster.projects[0].id}
                                    x={cluster.x}
                                    y={cluster.y}
                                    project={cluster.projects[0]}
                                />
                            );
                        } else {
                            // Multiple projects - clustered pin
                            return (
                                <ClusteredMapPin
                                    key={`cluster-${index}`}
                                    x={cluster.x}
                                    y={cluster.y}
                                    projects={cluster.projects}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </Section>
    );
};
