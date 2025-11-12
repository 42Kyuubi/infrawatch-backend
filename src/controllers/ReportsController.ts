import { Request, Response } from 'express';
import MatricsService from '../services/MatricsService';
import SystemService from '../services/SystemService';
import TypeSystemService from '../services/TypeSystemService';

class ReportsController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const [metrics, systems, systemTypes] = await Promise.all([
        MatricsService.getAll(),
        SystemService.getAll(),
        TypeSystemService.getAll(),
      ]);

      if (!metrics.length || !systems.length) {
        return res.status(200).json({
          message: 'Sem dados suficientes para gerar estatísticas.',
          data: [],
          stats: {},
        });
      }

      // ==== ESTATÍSTICAS GERAIS ====
      const totalSystems = systems.length;
      const totalIncidents = systems.filter(
        (s) => s.status === 'down'
      ).length;

      const totalDowntime = metrics.reduce(
        (acc, m) => acc + (m.downtime_minutes || 0),
        0
      );

      const avgUptime =
        metrics.reduce((acc, m) => acc + (m.uptime_percent || 0), 0) /
        metrics.length;

      const avgSLA =
        metrics.reduce((acc, m) => acc + (m.sla_percent || 0), 0) /
        metrics.length;

      // ==== MTTR MÉDIO (sistemas em manutenção) ====
      const maintenanceSystems = systems.filter(
        (s) => s.status === 'maintenance'
      );

      const avgMTTR =
        maintenanceSystems.length > 0
          ? metrics
              .filter((m) =>
                maintenanceSystems.some((s) => s.id === m.system_id)
              )
              .reduce((acc, m) => acc + (m.downtime_minutes || 0), 0) /
            maintenanceSystems.length
          : 0;

      // ==== DISPONIBILIDADE POR SERVIÇO ====
      const availabilityByConnection: Record<string, number> = {};
      const types = ['api', 'ping', 'snmp', 'webhook'];

      for (const type of types) {
        const systemsByType = systems.filter((s) => s.connection_type === type);
        if (systemsByType.length === 0) continue;

        const metricsByType = metrics.filter((m) =>
          systemsByType.some((s) => s.id === m.system_id)
        );

        const avgTypeUptime =
          metricsByType.reduce((acc, m) => acc + (m.uptime_percent || 0), 0) /
          metricsByType.length;

        availabilityByConnection[type] = parseFloat(avgTypeUptime.toFixed(2));
      }

      // ==== DISTRIBUIÇÃO POR CRITICIDADE ====
      const criticityDistribution = systems.reduce(
        (acc, s) => {
          acc[s.criticality_level] =
            (acc[s.criticality_level] || 0) + 1;
          return acc;
        },
        {
          low: 0,
          medium: 0,
          high: 0,
          critical: 0,
        } as Record<string, number>
      );

      // ==== PERFORMANCE POR TIPO DE SISTEMA ====
      const performanceByType = systemTypes.map((type: any) => {
        const systemsOfType = systems.filter((s) => s.id_type === type.id);

        if (systemsOfType.length === 0) {
          return {
            type_name: type.name,
            total_systems: 0,
            avg_uptime_percent: 0,
            avg_sla_percent: 0,
            total_incidents: 0,
            avg_mttr_minutes: 0,
          };
        }

        const metricsOfType = metrics.filter((m) =>
          systemsOfType.some((s) => s.id === m.system_id)
        );

        const avgUptimeType =
          metricsOfType.reduce((acc, m) => acc + (m.uptime_percent || 0), 0) /
          metricsOfType.length;

        const avgSLAType =
          metricsOfType.reduce((acc, m) => acc + (m.sla_percent || 0), 0) /
          metricsOfType.length;

        const totalIncidentsType = systemsOfType.filter(
          (s) => s.status === 'down'
        ).length;

        const maintenanceSystemsType = systemsOfType.filter(
          (s) => s.status === 'maintenance'
        );

        const avgMTTRType =
          maintenanceSystemsType.length > 0
            ? metricsOfType
                .filter((m) =>
                  maintenanceSystemsType.some((s) => s.id === m.system_id)
                )
                .reduce((acc, m) => acc + (m.downtime_minutes || 0), 0) /
              maintenanceSystemsType.length
            : 0;

        return {
          type_name: type.name,
          total_systems: systemsOfType.length,
          avg_uptime_percent: parseFloat(avgUptimeType.toFixed(2)),
          avg_sla_percent: parseFloat(avgSLAType.toFixed(2)),
          total_incidents: totalIncidentsType,
          avg_mttr_minutes: parseFloat(avgMTTRType.toFixed(2)),
        };
      });

      // ==== RESULTADO FINAL ====
      const stats = {
        total_systems: totalSystems,
        total_incidents: totalIncidents,
        total_downtime_minutes: totalDowntime,
        sla_general: parseFloat(avgSLA.toFixed(2)),
        availability_general: parseFloat(avgUptime.toFixed(2)),
        mttr_avg_minutes: parseFloat(avgMTTR.toFixed(2)),
        availability_by_connection: availabilityByConnection,
        criticity_distribution: criticityDistribution,
        performance_by_type: performanceByType,
      };

      return res.status(200).json({
        message: 'Relatório consolidado de métricas e sistemas.',
        data: { stats, systems, metrics, systemTypes },
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new ReportsController();
