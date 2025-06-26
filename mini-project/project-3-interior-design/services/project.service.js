const { Project, Client, ProjectAssignment, Staff } = require('../models');

module.exports = {
  async getAllProjects(req, res) {
    try {
      // Filter projects by status and handle pagination
      const { status, page = 1, limit = 5 } = req.query;
      const where = {
        is_deleted: false,
      };

      // function to filter projects by status
      if (status) {
        const lowerCaseStatus = status.toLowerCase();

        const statusMap = {
          tender: 'Tender',
          design: 'Design',
          construction: 'Construction',
          complete: 'Complete',
          onhold: 'On Hold',
        };

        const mappedStatus = statusMap[lowerCaseStatus];
        if (mappedStatus) {
          where.status = mappedStatus;
        } else {
          return res.status(400).json({
            error: 'Please provide a valid status value',
            validStatuses: [
              'Tender',
              'Design',
              'Construction',
              'Complete',
              'On Hold',
            ],
          });
        }
      }

      // Validate pagination parameters
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      // Calculate offset
      const offset = (pageNum - 1) * limitNum;

      // Fetch projects with count for pagination
      const { count, rows: projects } = await Project.findAndCountAll({
        where,
        include: [
          {
            model: Client,
            as: 'client',
            attributes: ['client_id', 'name', 'email', 'phone'],
            where: { is_deleted: false },
            required: false,
          },
          {
            model: ProjectAssignment,
            as: 'AssignedStaff',
            attributes: ['staff_id'],
            where: { is_deleted: false },
            required: false,
            include: [
              {
                model: Staff,
                as: 'staff',
                attributes: ['name', 'email', 'role'],
                where: { is_deleted: false },
              },
            ],
          },
        ],
        attributes: [
          'project_id',
          'project_name',
          'project_address',
          'status',
          'start_date',
          'target_completion',
        ],
        order: [['project_id', 'ASC']],
        limit: limitNum,
        offset: offset,
        distinct: true,
      });

      // Calculate pagination info
      const totalPages = Math.ceil(count / limitNum);

      const response = {
        message: status
          ? `Showing Projects with status '${status}'`
          : 'Showing all Projects',
        data: projects,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount: count,
          limit: limitNum,
        },
      };

      res.json(response);
    } catch (err) {
      console.error('Error in getAllProjects:', err);
      res.status(500).json({
        error: 'Failed to retrieve projects',
        details: err.message,
      });
    }
  },

  // GET /projects/:id
  async getProjectById(req, res) {
    try {
      const { project_id } = req.params;

      if (!project_id) {
        return res.status(400).json({
          success: false,
          message: 'Project ID is required',
        });
      }

      const project = await ProjectService.getProjectById(id);

      return res.status(200).json({
        success: true,
        message: 'Project retrieved successfully',
        data: project,
      });
    } catch (error) {
      console.error('Error in getProjectById:', error);

      if (error.message === 'Project not found') {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  },
};
