import React, { useEffect, useState } from 'react';
import { Building2, BriefcaseBusiness, House, UsersRound } from 'lucide-react';

const stakeholderIcons = {
  placement: BriefcaseBusiness,
  faculty: UsersRound,
  corporate: Building2,
  parents: House
};

export function StakeholderFlowSlide({ slide }) {
  const [pulsesStarted, setPulsesStarted] = useState(false);
  const columnCenters = [125, 375, 625, 875];
  const connections = slide.platforms.flatMap((platform, sourceIndex) =>
    slide.stakeholders.map((stakeholder, targetIndex) => {
      const sourceX = columnCenters[sourceIndex];
      const targetX = columnCenters[targetIndex];
      return {
        key: `${platform.name}-${stakeholder.name}`,
        path: `M ${sourceX} 0 C ${sourceX} ${24 + sourceIndex * 54 + targetIndex * 14} ${targetX} ${24 + sourceIndex * 54 + targetIndex * 14} ${targetX} 270`,
        index: sourceIndex * slide.stakeholders.length + targetIndex
      };
    })
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setPulsesStarted(true), 4800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="stakeholder-flow-slide">
      <header className="stakeholder-flow-heading">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </header>

      <div className="stakeholder-flow-diagram">
        <div className="stakeholder-platform-row" aria-label="Student learning platforms">
          {slide.platforms.map(platform => (
            <div className="stakeholder-platform-card" key={platform.name}>
              <img src={platform.logo} alt={platform.name} />
            </div>
          ))}
        </div>

        <svg
          className="stakeholder-pipelines"
          viewBox="0 0 1000 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {connections.map(connection => (
            <path
              key={`wire-${connection.key}`}
              className="pipeline-line"
              pathLength="1"
              d={connection.path}
              style={{ '--pipeline-delay': `${1450 + connection.index * 65}ms` }}
            />
          ))}
          {pulsesStarted && connections.map(connection => (
            <path
              key={`pulse-${connection.key}`}
              className="pipeline-energy"
              pathLength="1"
              d={connection.path}
              style={{ '--pulse-delay': `${connection.index * 150}ms` }}
            />
          ))}
          {slide.stakeholders.map((stakeholder, index) => (
            <circle
              key={`endpoint-${stakeholder.name}`}
              className={`pipeline-node pipeline-node-${index + 1}`}
              cx={columnCenters[index]}
              cy="270"
              r="7"
            />
          ))}
        </svg>

        <div className="stakeholder-card-row">
          {slide.stakeholders.map((stakeholder, index) => {
            const Icon = stakeholderIcons[stakeholder.icon] || Building2;
            return (
              <article className={`stakeholder-card stakeholder-card-${index + 1}`} key={stakeholder.name}>
                <div className="stakeholder-icon">
                  <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h2>{stakeholder.name}</h2>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
