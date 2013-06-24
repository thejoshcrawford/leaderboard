namespace Leaderboard.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedValidations2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Competition", "Name", c => c.String(nullable: false, maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Competition", "Name", c => c.String(nullable: false, maxLength: 5));
        }
    }
}
